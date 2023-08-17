import { SpeedItem } from './kmlParser';

export const createCommaSeparatedText = (items: SpeedItem[]): string => {
  const commaSeparatedList = items.map((speedItem) => {
    const { speed, name } = speedItem;
    const { long, lang } = speedItem.point;

    const radarSpeed = speed ? `Радар [${speed} км/год]` : 'Радар швидкості';

    return `${long},${lang},"${radarSpeed}: ${name}"`;
  });

  return commaSeparatedList.join('\n');
};
