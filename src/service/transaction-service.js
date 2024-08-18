import { prismaClient } from "../application/database";
import { getTransactionValidation } from "../validation/transaction-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, medicalRecordId) => {
    const transaction = validate(getTransactionValidation, medicalRecordId);
    transaction.username = user.username;

    const totalDataInDatabase = await prismaClient.medicalRecord.count({
        where: {
            id: medicalRecordId
        }
    });

    if (!totalDataInDatabase) {
        throw new ResponseError(404, "Medical record is not found");
    }

    return prismaClient.transaction.create({
        data: transaction,
        select: {
            id: true,
            total_price: true,
            medical_record_id: true,
            username: true
        }
    })
}

export default {
    create,
}