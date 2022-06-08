const getAllFeeds = async (req, res) => {
  try {
    res.send("Get All Feeds!");
  } catch (error) {
    res.send(error);
  }
};

const createFeed = async (req, res) => {
  try {
    res.send("Create Feeds!");
  } catch (error) {
    res.send(error);
  }
};

const getFeed = async (req, res) => {
  try {
    res.send("Get Feed!");
  } catch (error) {
    res.send(error);
  }
};

const updateFeed = async (req, res) => {
  try {
    res.send("Update Feed!");
  } catch (error) {
    res.send(error);
  }
};

const deleteFeed = async (req, res) => {
  try {
    res.send("Delete Feed!");
  } catch (error) {
    res.send(error);
  }
};

const likeFeed = async (req, res) => {
  try {
    res.send("Like Feed!");
  } catch (error) {
    res.send(error);
  }
};

export { getAllFeeds, getFeed, createFeed, updateFeed, deleteFeed, likeFeed };
