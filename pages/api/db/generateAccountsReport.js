import { prisma } from '@/server/db/client';
import PDFDocument from 'pdfkit';



export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case "POST":
        const { startDate, endDate, interval} = req.body;
        const result = await generateAccountsReport(startDate, endDate, interval)
        res.status(201).json(result)
        break
      default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

const generateAccountsReport = async (startDate, endDate, interval) => {

    let registrations = [];
    if (interval == "days") {
        registrations = await prisma.$queryRaw`SELECT 
        date_part('day', data_rejestracji::date) AS dzien, 
        date_part('month', data_rejestracji::date) AS miesiac,  
        date_part('year', data_rejestracji::date) AS rok, 
        COUNT(id_konta)           
        FROM konta
        WHERE data_rejestracji between ${new Date(startDate)} AND ${new Date(endDate)}
        GROUP BY dzien, miesiac, rok
        ORDER BY dzien;`;
    } else if (interval == "weeks") {
        registrations = await prisma.rejestracja_tygodniowo.findMany({
            select:{
                tydzien:true,
                rok:true,
                count:true,
            },
            where: {
                data_start: {
                    gte: new Date(startDate),
                  },
                  data_koniec: {
                    lte: new Date(endDate),
                  },
            },
          });
    } else if (interval == "months") {
        registrations = await prisma.rejestracja_miesiecznie.findMany({
            select:{
                miesiac:true,
                rok:true,
                count:true,
            },
            where: {
                data_start: {
                    gte: new Date(startDate),
                  },
                  data_koniec: {
                    lte: new Date(endDate),
                  },
            },
          });
    } else if (interval == "years") {
        registrations = await prisma.rejestracja_rocznie.findMany({
            select:{
                rok:true,
                count:true,
            },
            /*where: {
                data_start: {
                    gte: new Date(startDate),
                  },
                  data_koniec: {
                    lte: new Date(endDate),
                  },
            },*/
          });
    }

    // Wygeneruj raport w odpowiednim formacie (np. jako tabela, plik CSV itp.)
    const report = generateReport(registrations, interval);  
    //return report;
    return 'ok';
};


const generateReport = (registrations, interval) => {
    const problemName = 'accounts_report';
    const fs = require('fs');
    const PDFDocument = require("pdfkit-table");
    // Inicjalizacja nowego dokumentu PDF
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    // Tworzenie strony raportu
    doc.fontSize(18).text('Raport Rejestracji Uzytkownikow', { align: 'center' });
    doc.moveDown();

    const table = {
        title:
          "Raport dotyczacy ilosci nowych kont" ,
        divider: {
          header: { disabled: true },
          horizontal: { disabled: false, width: 1, opacity: 1 },
          padding: 5,
          columnSpacing: 10,
        },
        headers: [
          { width: 130, renderer: null },
          { width: 130, renderer: null },
          { width: 130, renderer: null },
          { width: 130, renderer: null },
        ],
        rows: [],
      };
  
    // Dodaj dane raportu do tabeli
    registrations.forEach((registration) => {
      const { dzien, rok, tydzien, miesiac, count } = registration;
      const date = interval === 'days' ? `${dzien}.${miesiac}.${rok}` : `${tydzien}/${miesiac}/${rok}`;
  
      table.rows.push([date, count]);
    });
  
    // Generowanie tabeli w dokumencie PDF
    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold'),
      prepareRow: (row, i) => doc.font('Helvetica').fontSize(12),
    });
  
    // Zapisz raport do pliku
    doc.pipe(fs.createWriteStream('accounts_report.pdf'));
    doc.end();
  
    return 'Raport został wygenerowany i zapisany jako plik PDF.';
  };
  

