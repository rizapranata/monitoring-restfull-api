import printMedicalRecordService from "../service/printMedicalRecord-service.js";

const get = async (req, res, next) => {
  try {
    const medicalRecordId = req.params.medicalRecordId;
    const result = await printMedicalRecordService.get(medicalRecordId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    res.json({
      error: 1,
      message: e.message,
    });
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      name: req.query.name,
      noRm: req.query.noRm,
      page: req.query.page,
      size: req.query.size
    };

    console.log("request MR 2:", request);

    const result = await printMedicalRecordService.search(request);
    res.status(200).json({
      status: "success",
      message: "get all medical records successful",
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    res.json({
      error: 1,
      message: e.message,
    });
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const medicalRecordId = req.params.medicalRecordId;
    await printMedicalRecordService.remove(medicalRecordId);
    res.status(200).json({
      status: "success",
      message: `medical record with id ${medicalRecordId} is already deleted!`,
      data: "Ok"
    });
  } catch (e) {
    res.json({
      error: 1,
      message: e.message,
    });
    next(e);
  }
};

export default {
  get,
  search,
  remove
};
