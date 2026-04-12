const ProgressService = require("../services/progress.service");
const { handleError } = require("../utils/errorHandler");

class ProgressController {

  static async getAllProgress(req, res) {
    try {
      const progress = await ProgressService.getAllProgress();
      res.json(progress);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async getProgressById(req, res) {
    try {
      const progress = await ProgressService.getProgressById(req.params.progress_id);
      res.json(progress);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async createProgress(req, res) {
    try {
      const progress = await ProgressService.createProgress(req.body);
      res.status(201).json(progress);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async updateProgress(req, res) {
    try {
      const progress = await ProgressService.updateProgress(
        req.params.progress_id,
        req.body
      );
      res.json(progress);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async deleteProgress(req, res) {
    try {
      await ProgressService.deleteProgress(req.params.progress_id);
      res.json({ message: "Progress deleted successfully" });
    } catch (err) {
      return handleError(res, err);
    }
  }
}

module.exports = ProgressController;