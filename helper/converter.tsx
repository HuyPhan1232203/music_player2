export const secondToMin = (sec: number) => {
  const minPart = Math.floor(sec / 60);
  const secPart = Math.floor(sec % 60);
  const formattedMin = String(minPart).padStart(2, "0");
  const formattedSec = String(secPart).padStart(2, "0");
  return `${formattedMin}:${formattedSec}`;
};
