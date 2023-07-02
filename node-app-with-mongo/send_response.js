exports.send_error = function (error) {
    if (typeof error == 'string') {
        return {
            status: 0,
            error: { error: { message: error } }
        }
    }
    return {
        status: 0,
        error: error
    }
}

exports.send_success = function (msg, data) {
    return {
        status: 1,
        message: msg,
        data: data
    }
}