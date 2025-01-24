import { read, utils, writeFile, readFile } from "xlsx";

/**Todo
 * 액셀 파일 가져오기
 * 액셀 데이터 파싱하기
 * JSON형식으로 변환하기
 */

export async function fetchExcelData(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    //URL 입력 받으면 readFile -> read로 변경
    const workbook = readFile(arrayBuffer, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    //const data = utils.sheet_to_json(worksheet);
    const range = utils.decode_range(worksheet["!ref"]);
    const data = [];

    for (let rowNum = range.s.r + 2; rowNum <= range.e.r; rowNum++) {
      const row = {
        titleId: worksheet[`A${rowNum}`]?.v,
        yearNode: worksheet[`B${rowNum}`]?.v,
        c: worksheet[`C${rowNum}`]?.v,
        titleNode: worksheet[`D${rowNum}`]?.v,
        e: worksheet[`E${rowNum}`]?.v,
        f: worksheet[`F${rowNum}`]?.v,
        g: worksheet[`G${rowNum}`]?.v,
        h: worksheet[`H${rowNum}`]?.v,
        publisherNode: worksheet[`I${rowNum}`]?.v,
        j: worksheet[`J${rowNum}`]?.v,
        k: worksheet[`K${rowNum}`]?.v,
        l: worksheet[`L${rowNum}`]?.v,
        m: worksheet[`M${rowNum}`]?.v,
        n: worksheet[`N${rowNum}`]?.v,
        placeNode: worksheet[`O${rowNum}`]?.v,
        p: worksheet[`P${rowNum}`]?.v,
        q: worksheet[`Q${rowNum}`]?.v,
        r: worksheet[`R${rowNum}`]?.v,
        s: worksheet[`S${rowNum}`]?.v,
        t: worksheet[`T${rowNum}`]?.v,
        categoryNode: worksheet[`U${rowNum}`]?.v,
        v: worksheet[`V${rowNum}`]?.v,
        tag1: worksheet[`W${rowNum}`]?.v,
        tag2: worksheet[`X${rowNum}`]?.v,
        tag3: worksheet[`Y${rowNum}`]?.v,
        tag4: worksheet[`Z${rowNum}`]?.v,
        tag5: worksheet[`AA${rowNum}`]?.v,
        tag6: worksheet[`AB${rowNum}`]?.v,
        tag7: worksheet[`AC${rowNum}`]?.v,
        tag8: worksheet[`AD${rowNum}`]?.v,
      };

      data.push(row);
    }

    return data;
  } catch (error) {
    console.error("Error reading Excel file : ", error);
    throw error;
  }
}
