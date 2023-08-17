import { XMLParser } from 'fast-xml-parser';

interface KMLData {
  kml: {
    Document: {
      Folder: {
        Placemark: PlacemarkType[];
      };
    };
  };
}

interface PlacemarkType {
  name: string;
  description: string;
  ExtendedData: {
    Data: { '@_name': AttibutesName; value: string }[];
  };
  Point: { coordinates: string };
}

type AttibutesName =
  | 'Індекс дороги'
  | 'Регіон'
  | 'Місце, км'
  | 'Напрямок спрямування приладу'
  | 'Координати GPS'
  | 'Обмеження швидкісного режиму';

export interface SpeedItem {
  name: string;
  speed: string | undefined;
  point: {
    lang: string;
    long: string;
  };
}

export const kmlXmlParser = (xmlTextFile: string): SpeedItem[] => {
  const kmlObject = new XMLParser({ ignoreAttributes: false }).parse(
    xmlTextFile
  ) as KMLData;

  const result = kmlObject.kml.Document.Folder.Placemark.map((r) => {
    return {
      name: getNameValue(r.name),
      speed: getSpeedValue(r.ExtendedData),
      point: getCoordinates(r.Point?.coordinates),
    } as SpeedItem;
  });

  return result;
};

const MAX_NAME_SIZE = 50;
const getNameValue = (value: string = ''): string => {
  const trimedValue = value.replaceAll('\n', '. ').trim();
  if (trimedValue.length <= MAX_NAME_SIZE) {
    return trimedValue;
  }

  const newValue = trimedValue.slice(0, MAX_NAME_SIZE - 3);
  return `${newValue}...`;
};

const getSpeedValue = (data: PlacemarkType['ExtendedData']) => {
  const speedValue = data.Data.find(
    (r) => r['@_name'] === 'Обмеження швидкісного режиму'
  );
  if (!speedValue) return undefined;

  // // інколи ми маємо декілька швидкостей розділених між собою '\n'
  const valueAsString = speedValue.value.toString();
  const result = valueAsString.replaceAll('\n', '/');
  return result;
};

const getCoordinates = (value: string = '') => {
  const [long, lang] = value.split(',');
  return { lang, long };
};
