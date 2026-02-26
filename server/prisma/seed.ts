import { PrismaClient, DayOfWeek, CaseType, PaymentMethod } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {

    console.log("Seeding admin...");
    await prisma.adminProfile.upsert({
        where: { email: "admin1@clinic.com" },
        update: {},
        create: {
            id: crypto.randomUUID(),
            email: "admin1@clinic.com",
            password: "admin123"
        }
    });


    console.log("Seeding departments...");
    const departments = await Promise.all([
        prisma.department.upsert({ where: { name: "Cardiology" }, update: {}, create: { name: "Cardiology" } }),
        prisma.department.upsert({ where: { name: "Orthopedics" }, update: {}, create: { name: "Orthopedics" } }),
        prisma.department.upsert({ where: { name: "Dental" }, update: {}, create: { name: "Dental" } }),
        prisma.department.upsert({ where: { name: "Pediatrics" }, update: {}, create: { name: "Pediatrics" } }),
        prisma.department.upsert({ where: { name: "Neurology" }, update: {}, create: { name: "Neurology" } })
    ]);


    console.log("Seeding doctors...");
    const doctors = await Promise.all([
        prisma.doctor.create({
            data: {
                fullName: "Dr. Ram Sharma",
                phoneNumber: "9800000001",
                departmentId: departments[0].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Sita Karki",
                phoneNumber: "9800000002",
                departmentId: departments[1].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Hari Gautam",
                phoneNumber: "9800000003",
                departmentId: departments[2].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Maya Thapa",
                phoneNumber: "9800000004",
                departmentId: departments[3].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Bishal Rai",
                phoneNumber: "9800000005",
                departmentId: departments[4].id
            }
        })
    ]);


    console.log("Seeding doctor schedules...");
    await Promise.all(
        doctors.map((doc, index) =>
            prisma.doctorSchedule.create({
                data: {
                    doctorId: doc.id,
                    dayOfWeek: Object.values(DayOfWeek)[index % 7] as DayOfWeek,
                    startTime: new Date("2024-01-01T09:00:00"),
                    endTime: new Date("2024-01-01T17:00:00"),
                    room: `10${index + 1}`
                }
            })
        )
    );


    console.log("Seeding OPD entries...");
    const baseDate = "2082-10-";
    await Promise.all(
        doctors.map((doctor, index) =>
            prisma.opdEntry.create({
                data: {
                    entryDateBs: `${baseDate}${String(index + 1).padStart(2, '0')}`,
                    entryMonth: "KARTIK",
                    caseType: CaseType.NEW,
                    patientName: `Patient ${index + 1}`,
                    age: 25 + index,
                    address: "Kathmandu",
                    phoneNo: "9811111111",
                    treatment: "General Checkup",
                    doctorId: doctor.id,
                    totalAmount: 500,
                    paymentMethod: PaymentMethod.CASH,
                    paidAmount: 500,
                    dueAmount: 0,
                    expenseAmount: 0
                }
            })
        )
    );

    console.log("Seeding completed successfully");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
