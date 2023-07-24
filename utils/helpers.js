const { User } = require('../models/User');

const format_date = (date) => {
    // Format date as MM/DD/YYYY
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
};

const get_author = async (user_id) => {
    // Find user by id and return username
    const user = await User.findOne({ where: { id: user_id } });
    return user.username;
};

module.exports = {
    format_date,
    get_author,
};
