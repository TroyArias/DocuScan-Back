import { GoogleSpreadsheet } from 'google-spreadsheet';
import {TEXT_DELIMITER, mapFor1Customer, mapFor2Customer, mapForRegist, mapForCertOfTitle, key} from "../constants.js"
import {delimeter} from "../functions.js"

export const getDocument = async function (req, res) {
    try {
        
        const doc = new GoogleSpreadsheet('1lSHNKt0Kj6_tokOjfmAt3lML7qXWXdgvT4eF87QaLNk');
        
        await doc.useServiceAccountAuth({
            client_email: key.client_email,
            private_key: key.private_key,
          });
          
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]
        
        await sheet.loadCells('A1:B20');

        let cells = (sheet.cellStats.nonEmpty/2) + 1
        
        let firstOwner, secondOwner, regist, certOfTitle = {}

        for (let i = 1; i < cells; i++) { 
        
            let value = sheet.getCellByA1(`A${i}`).value;
            let data = sheet.getCellByA1(`B${i}`).value;

            if(data != null && value != null) {
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





