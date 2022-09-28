import {FIELDS_DELIMITER, WHITESPACE_DELIMITER} from "./constants.js"

export function delimeter (map, text) {

    const requiredFields = new Map(map)
  
      let user = {}
      const replaceValues = ['\r', '\\', '}']
      requiredFields.forEach((value, key) => {
          text.forEach(e => {
            if(e.startsWith(key)) {
  
              let textValue = e.replace(key, '');
              replaceValues.forEach(x => {
                  textValue = textValue.replace(x, '');
              })
  
              if(value.includes(FIELDS_DELIMITER)){
                const fields = value.split(FIELDS_DELIMITER);
                const values = textValue.split(WHITESPACE_DELIMITER);
                fields.forEach((field, i) => {
                  user[field] = values[i];
                })
  
              } else {
                user[value] = textValue.trim();
              }
            }
          })
        });
  
      return user
  }