import Performance from '../models/performance.model.js';

// Get Performance by Test
export const getPerformanceByTest = async (req, res) => {
  try {
    const performance = await Performance.find({ user: req.user.userId, test: req.params.testId })
      .populate('test')
      .populate('questionWiseStats.question');
    
    if (!performance) {
      return res.status(404).json({ message: 'No performance data found' });
    }

    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performance data' });
  }
};
