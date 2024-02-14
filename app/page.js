import DatePikerCustom from "./_components/DatePikerCustom";
import Header from "./_components/Header";
export default function Home() {
  const busyDays = [
    new Date(2024, 1, 5).toDateString(), // 5 de febrero de 2024
    new Date(2024, 1, 10).toDateString(), // 10 de febrero de 2024
    new Date(2024, 1, 15).toDateString(), // 15 de febrero de 2024
    // Agrega más días ocupados según sea necesario
];

  return (
    <main className="flex w-[100vw] h-[100vh] flex-col items-center justify-center">
      <Header/>
      <DatePikerCustom busyDays={busyDays}/>
    </main>
  );
}
