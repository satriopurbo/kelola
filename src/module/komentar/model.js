import { sq } from '../../config/connection.js';
import { DataTypes } from 'sequelize';


const komentar = sq.define('komentar', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_komentator: {
        type: DataTypes.STRING
    },
    isi_komentar: {
        type: DataTypes.TEXT
    },
    kehadiran:{
        type:DataTypes.SMALLINT,
        defaultValue:0    //0 tidak tahu, 1 datang, 2 tidak datang
    }
},
    {
        paranoid: true,
        freezeTableName: true
    }
);



export default komentar
