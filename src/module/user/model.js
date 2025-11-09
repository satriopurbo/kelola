import { sq } from '../../config/connection.js';
import { DataTypes } from 'sequelize';


const user = sq.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    nama_user:{
        type:DataTypes.STRING
    }
},
    {
        paranoid: true,
        freezeTableName: true
    }
);



export default user
