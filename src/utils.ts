type Options = {
  defaultValue?: any;
  serializer?: (val: any) => string;
  deserializer?: (val: string) => any;
};

export function setValueInLocalStorage(
  key: string,
  value: any,
  options: Pick<Options, 'serializer'> = {}
) {
  if (options.serializer) {
    localStorage.setItem(key, options.serializer(value));
  } else {
    localStorage.setItem(key, defaultSerializer(value));
  }
}

export function getValueFromLocalStorage(
  key: string,
  options: Pick<Options, 'defaultValue' | 'deserializer'> = {}
) {
  const storedItem = localStorage.getItem(key);

  if (storedItem) {
    return options.deserializer
      ? options.deserializer(storedItem)
      : defaultDeserializer(storedItem);
  }

  return options.defaultValue || '';
}

export function clearValueFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

const defaultSerializer = JSON.stringify;
const defaultDeserializer = JSON.parse;

export function getNbOnColumnInStorage() {
  return getValueFromLocalStorage('columns', {
    defaultValue: 1,
    deserializer: (val: string) => parseInt(val, 10),
  });
}
