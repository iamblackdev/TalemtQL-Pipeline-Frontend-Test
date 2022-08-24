export default async function getData(pageNumber: number = 1) {
  const response = await fetch(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${pageNumber}`
  );
  return response.json();
}
