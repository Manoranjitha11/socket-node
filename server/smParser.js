module.exports = (data) => {
    var firstByte = data[0];
    var secondByte = data[1];

    var finCode = firstByte >> 7;
    var isFinished = finCode == 1 ? true : false;
    var opCode = firstByte & 0x0F;

    // if(opCode == 10){
    //     return '{"msg":"pong"}';
    // }
    // if(opCode == 8){
    //     return '{"msg":"close"}'
    // }
    var isMasked = ((secondByte >> 7) == 1);
    var payloadLength = secondByte & 0x7F;
    var calPayloadLength = payloadLength;
    var payloadOffset = {
        125: [2,6],
        126: [4,8],
        127: [10,14]
    };



    if(payloadLength == 126){
        calPayloadLength = (256*data[2])+data[3];
        console.log("hdjshdjhsdsd");
        console.log(calPayloadLength)
    }

    var offset = payloadOffset[payloadLength <= 125 ? 125 : payloadLength];
    var maskKey = [];
    for (var i = offset[0]; i < offset[1]; i++){
        maskKey.push(data[i]);
    }
    var dataLength = calPayloadLength + offset[1];
    var unmaskedData = [];
    for (var i = offset[1]; i < dataLength; i++){
        var j = i - offset[1];
        unmaskedData.push(data[i] ^ maskKey[j % 4]);
    }
    // console.log(unmaskedData);
    // console.log("hj");
    return Buffer.from(unmaskedData).toString('utf-8');
}
