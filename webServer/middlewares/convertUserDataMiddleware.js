const User = require('../models/user');

function convertGenderToVietnamese(gender) {
    if (gender === "Male") {
        return "Nam";
    } else if (gender === "Female") {
        return "Nữ";
    } else {
        return gender;
    }
}
function changeDateToString(currentTime) {
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();

    if (day.toString().length === 1) {
        day = "0" + day.toString();
    }
    if (month.toString().length === 1) {
        month = "0" + month.toString();
    }

    return day + "/" + month + "/" + year;
}

const getUserData = async (req, res, next) => {
    try {
        //---Truyền hẳn user vào luôn
        let user = null;
        if (req.userId) user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender').exec();
        // Xử lí thông tin user ở đây
        if (user) {
            const formattedDateOfBirth = changeDateToString(user.dateOfBirth);
            const formattedGender = convertGenderToVietnamese(user.gender);
            user = { ...user.toObject(), dateOfBirth: formattedDateOfBirth, gender: formattedGender };
        }
        req.user = user;
        //----------------------------------------
        next();
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {getUserData};

