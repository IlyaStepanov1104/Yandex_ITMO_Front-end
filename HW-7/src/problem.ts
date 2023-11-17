export const NOMINATIVE = 1; // именительный
export const GENITIVE = 2; // родительный
export const DATIVE = 3; // дательный
export const ACCUSATIVE = 4; // винительный
export const INSTRUMENTAL = 5; // творительный
export const PREPOSITIONAL = 6; // предложный

export const MALE = 1;
export const FEMALE = 2;
export const ANDROGYNOUS = 4;

type Gender = {
  male?: string[],
  female?: string[],
  androgynous?: string[],
  [key: string]: string[];
}

type Mods = {
  gender: number,
  test: string[],
  mods: string[],
  tags?: string[]
}

type RuleSetGender = {
  exceptions?: Gender;
  suffixes?: Gender;
}

type RuleSetMods = {
  exceptions?: Mods[];
  suffixes?: Mods[];
}

export function endsWith(str: string, search: string): boolean
{
  const strLength = str.length;
  return str.substring(strLength - search.length, strLength) === search;
}

export function startsWith(str: string, search: string, pos?: number): boolean
{
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

export function getGenderConst(key: string|number|undefined|null): number|null
{
  switch (key) {
    case 'male':
    case MALE:
      return MALE;
    case 'female':
    case FEMALE:
      return FEMALE;
    case 'androgynous':
    case ANDROGYNOUS:
      return ANDROGYNOUS;
    default:
      return null;
  }
}

export function getGenderByRuleSet(name: string, ruleSet: RuleSetGender) {
  if (!name || !ruleSet) {
    return null;
  }
  const nameLower = name.toLowerCase();
  if (ruleSet.exceptions) {
    const gender = getGenderByRule(ruleSet.exceptions, (some) => {
      if (startsWith(some, '-')) {
        return endsWith(nameLower, some.substr(1));
      }
      return some === nameLower;
    });
    if (gender) return gender;
  }
  return ruleSet.suffixes
    ? getGenderByRule(ruleSet.suffixes, (some) => endsWith(nameLower, some))
    : null;
}

export function getGenderByRule(rules: Gender, matchFn: (some: string) => boolean): number|null
{
  const genders = Object.keys(rules).filter((genderKey) => {
    const array = rules[genderKey];
    return Array.isArray(array) && array.some(matchFn);
  });
  if (genders.length !== 1) {
    return null;
  }

  return getGenderConst(genders[0]!);
}

export function inclineByRules(str: string, declensionStr: number, genderStr: number, ruleSet: RuleSetMods) {
  const declension = getDeclensionConst(declensionStr);
  const gender = getGenderConst(genderStr);

  const parts = str.split('-');
  const result = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const isFirstWord = i === 0 && parts.length > 1;

    const rule = findRule(part, gender, ruleSet, {
      firstWord: isFirstWord,
    });

    if (rule) {
      result.push(applyRule(rule, part, declension));
    } else {
      result.push(part);
    }
  }
  return result.join('-');
}

export function findRule(str: string, gender: number|null, ruleSet: RuleSetMods, tags: {[key: string]: boolean} = {}) {
  if (!str) {
    return null;
  }
  const strLower = str.toLowerCase();

  const tagList: string[] = [];
  Object.keys(tags).forEach((key) => {
    if (tags[key]) {
      tagList.push(key);
    }
  });

  if (ruleSet.exceptions) {
    const rule = findExactRule(ruleSet.exceptions, gender, (some) => some === strLower, tagList);
    if (rule) return rule;
  }

  return ruleSet.suffixes
    ? findExactRule(ruleSet.suffixes, gender, (some) => endsWith(strLower, some), tagList)
    : null;
}

export function findExactRule(rules: Mods[], gender: number|null, matchFn: (some: string) => boolean, tags: string[] = []) {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]!;

    if (rule.tags) {
      if (!rule.tags.find((t) => tags.indexOf(t) !== -1)) {
        continue;
      }
    }

    if (rule.gender !== ANDROGYNOUS && gender !== rule.gender) {
      continue;
    }

    if (rule.test) {
      for (let j = 0; j < rule.test.length; j++) {
        if (matchFn(rule.test[j]!)) {
          return rule;
        }
      }
    }
  }
  return null;
}

export function getModByIdx(mods: string[], i: number): string
{
  if (mods && mods.length >= i) {
    return mods[i]!;
  }
  return '.';
}

export function applyRule(rule: {mods: string[]}, str: string, declension: number|null): string
{
  let mod;
  switch (declension) {
    case NOMINATIVE:
      mod = '.';
      break;
    case GENITIVE:
      mod = getModByIdx(rule.mods, 0);
      break;
    case DATIVE:
      mod = getModByIdx(rule.mods, 1);
      break;
    case ACCUSATIVE:
      mod = getModByIdx(rule.mods, 2);
      break;
    case INSTRUMENTAL:
      mod = getModByIdx(rule.mods, 3);
      break;
    case PREPOSITIONAL:
      mod = getModByIdx(rule.mods, 4);
      break;
    default:
      mod = '.';
  }

  return applyMod(str, mod);
}

export function applyMod(str: string, mod: string): string
{
  for (let i = 0; i < mod.length; i++) {
    const chr = mod[i];
    switch (chr) {
      case '.':
        break;
      case '-':
        str = str.substr(0, str.length - 1);
        break;
      default:
        str += chr;
    }
  }
  return str;
}

export function getDeclensionConst(key: string|number|null): number|null
{
  switch (key) {
    case 'nominative':
    case NOMINATIVE:
      return NOMINATIVE;
    case 'genitive':
    case GENITIVE:
      return GENITIVE;
    case 'dative':
    case DATIVE:
      return DATIVE;
    case 'accusative':
    case ACCUSATIVE:
      return ACCUSATIVE;
    case 'instrumental':
    case INSTRUMENTAL:
      return INSTRUMENTAL;
    case 'prepositional':
    case PREPOSITIONAL:
      return PREPOSITIONAL;
    default:
      return null;
  }
}

export function getDeclensionStr(cnst: string|number|null): string|null
{
  switch (cnst) {
    case 'nominative':
    case NOMINATIVE:
      return 'nominative';
    case 'genitive':
    case GENITIVE:
      return 'genitive';
    case 'dative':
    case DATIVE:
      return 'dative';
    case 'accusative':
    case ACCUSATIVE:
      return 'accusative';
    case 'instrumental':
    case INSTRUMENTAL:
      return 'instrumental';
    case 'prepositional':
    case PREPOSITIONAL:
      return 'prepositional';
    default:
      return null;
  }
}
