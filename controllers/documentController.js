import { GoogleSpreadsheet } from 'google-spreadsheet';
import {TEXT_DELIMITER, mapFor1Customer, mapFor2Customer, mapForRegist, mapForCertOfTitle, key1} from "../constants.js"
import {delimeter} from "../functions.js"

export const getDocument = async function (req, res) {
    try {

        let doc

        switch(req.headers.token){
            case 'user1':
                doc = new GoogleSpreadsheet('1lSHNKt0Kj6_tokOjfmAt3lML7qXWXdgvT4eF87QaLNk');
                break;
            case 'user2':
                doc = new GoogleSpreadsheet('1cXr7ZrKa_6zLiIdsDUGhKOCIeCWEbmdX1Ejb3_yEsW0');
                break
            case 'user3':
                doc = new GoogleSpreadsheet('1gHfMj1wKU433kAbnY3YTMAoZ_uedGRnzRvhgFjOZ2Nk');
                break
            case 'user4':
                doc = new GoogleSpreadsheet('17rrUWIHzxv3D_68PYbGU-dTQkTvtVDsvvj99c7mnKB8');
                break
            default: throw "Incorrect token"
        }
    
        await doc.useServiceAccountAuth({
            client_email: key1.client_email,
            private_key: key1.private_key,
        });
          
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]
        
        await sheet.loadCells('A1:B20');

        let cells = (sheet.cellStats.nonEmpty/2) + 1
        
        let firstOwner, secondOwner, regist, certOfTitle = {}

        for (let i = 1; i < cells; i++) { 
        
            let value = sheet.getCellByA1(`A${i}`).value;
            let data = sheet.getCellByA1(`B${i}`).value;

            if(data != null && typeof(data) == 'string' && value != null) {

                let text = data.split(TEXT_DELIMITER)
            
                switch(value){
                    case 'first owner':
                        firstOwner = delimeter(mapFor1Customer, text)
                    break;

                    case 'second owner':
                        secondOwner = delimeter(mapFor2Customer, text)
                    break;

                    case 'regist':
                        regist = delimeter(mapForRegist, text)
                    break;

                    case 'certOfTitle':
                        certOfTitle = delimeter(mapForCertOfTitle, text)
                    break;
                } 
            }  
        }

        await sheet.clearRows()
        
        let allData = {};
        allData.firstOwner = firstOwner;
        allData.secondOwner = secondOwner;
        allData.regist  = regist;
        allData.certOfTitle = certOfTitle;
        
        return res.status(201).json(allData);
        
    } catch (e) {
        return res.status(500).send(e);
    }
};

export const clearDocument = async function (req, res) {
    try {

        let doc

        switch(req.headers.token){
            case 'user1':
                doc = new GoogleSpreadsheet('1lSHNKt0Kj6_tokOjfmAt3lML7qXWXdgvT4eF87QaLNk');
                break;
            case 'user2':
                doc = new GoogleSpreadsheet('1cXr7ZrKa_6zLiIdsDUGhKOCIeCWEbmdX1Ejb3_yEsW0');
                break
            case 'user3':
                doc = new GoogleSpreadsheet('1gHfMj1wKU433kAbnY3YTMAoZ_uedGRnzRvhgFjOZ2Nk');
                break
            case 'user4':
                doc = new GoogleSpreadsheet('17rrUWIHzxv3D_68PYbGU-dTQkTvtVDsvvj99c7mnKB8');
                break
            default: throw "Incorrect token"
        }
        
        await doc.useServiceAccountAuth({
            client_email: key1.client_email,
            private_key: key1.private_key,
          });
          
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]
        
        await sheet.loadCells('A1:B30');
        await sheet.clearRows()

        return res.status(200).json();

    } catch (e) {
        return res.status(500).send(e);
    }
};


