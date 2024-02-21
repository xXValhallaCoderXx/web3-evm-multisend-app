export const parseCsvUpload = (results: any) => {
  const headers = results.data[0];
  const rows = results.data.slice(1); // Skip the first row with headers

  const jsonArray = rows
    .map((row: any) => {
      const obj: any = {};
      row.forEach((value: any, index: number) => {
        // Only add non-empty values
        if (value !== "") {
          obj[headers[index]] = value;
        }
      });
      return obj;
    })
    .filter((obj: any) => Object.keys(obj).length > 0); // Remove empty objects

  return jsonArray;
};
