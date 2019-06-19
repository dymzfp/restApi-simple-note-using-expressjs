'use strict'

exports.err = (sts, res, msg) => {
    let data = {
        status: sts,
        message: msg
    };

    res.status(sts);
    res.json(data);
    res.end();
}

exports.ok = (sts, res, ...data) => {

    if(data.length == 1){
        var dataRes = {
            status: sts,
            message: data[0]
        };
    }
    else{
        var dataRes = {
            status: sts,
            message: data[0],
            data: data[1]
        };
    }

    res.status(sts);
    res.json(dataRes);
    res.end();

}