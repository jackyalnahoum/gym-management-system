const ProgressService = require("../services/progress.service");

class ProgressController {

  static async getAllProgress(req, res) {
    try {
      const progress = await ProgressService.getAllProgress();
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProgressById(req, res) {
    try {
      const progress = await ProgressService.getProgressById(req.params.progress_id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createProgress(req, res) {
    try {
      const progress = await ProgressService.createProgress(req.body);
      res.status(201).json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProgress(req, res) {
    try {
      const progress = await ProgressService.updateProgress(
        req.params.progress_id,
        req.body
      );
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProgress(req, res) {
    try {
      await ProgressService.deleteProgress(req.params.progress_id);
      res.json({ message: "Progress deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProgressController;