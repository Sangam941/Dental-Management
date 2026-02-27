import { PrismaClient, CaseType, PaymentMethod } from '@prisma/client';
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
        prisma.department.upsert({ where: { departmentName: "Cardiology" }, update: {}, create: { departmentName: "Cardiology" } }),
        prisma.department.upsert({ where: { departmentName: "Orthopedics" }, update: {}, create: { departmentName: "Orthopedics" } }),
        prisma.department.upsert({ where: { departmentName: "Dental" }, update: {}, create: { departmentName: "Dental" } }),
        prisma.department.upsert({ where: { departmentName: "Pediatrics" }, update: {}, create: { departmentName: "Pediatrics" } }),
        prisma.department.upsert({ where: { departmentName: "Neurology" }, update: {}, create: { departmentName: "Neurology" } })
    ]);


    console.log("Seeding doctors...");
    const doctors = await Promise.all([
        prisma.doctor.create({
            data: {
                fullName: "Dr. Ram Sharma",
                phoneNumber: "9800000001",
                gender: "MALE",
                departmentId: departments[0].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Sita Karki",
                phoneNumber: "9800000002",
                gender: "FEMALE",
                departmentId: departments[1].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Hari Gautam",
                phoneNumber: "9800000003",
                gender: "MALE",
                departmentId: departments[2].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Maya Thapa",
                phoneNumber: "9800000004",
                gender: "FEMALE",
                departmentId: departments[3].id
            }
        }),
        prisma.doctor.create({
            data: {
                fullName: "Dr. Bishal Rai",
                phoneNumber: "9800000005",
                gender: "MALE",
                departmentId: departments[4].id
            }
        })
    ]);


    console.log("Seeding OPD entries and Billings...");
    const baseDate = "2082-10-";
    await Promise.all(
        doctors.map(async (doctor, index) => {
            const opdEntry = await prisma.opdEntry.create({
                data: {
                    entryDate: `${baseDate}${String(index + 1).padStart(2, '0')}`,
                    entryMonth: "KARTIK",
                    caseType: "NEW",
                    fullName: `Patient ${index + 1}`,
                    age: 25 + index,
                    
                    address: "Kathmandu",
                    phoneNumber: "9811111111",
                    treatment: "General Checkup",
                    gender: index % 2 === 0 ? "MALE" : "FEMALE",
                    doctorId: doctor.id,
                }
            });

            // Create a billing record for each OPD entry
            await prisma.billing.create({
                data: {
                    opdEntryId: opdEntry.id,
                    totalAmount: 500,
                    paymentMethod: "CASH",
                    paidAmount: 500,
                    dueAmount: 0,
                    expenseAmount: 0
                }
            });
        })
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
