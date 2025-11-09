import komentar from './model.js'
import { sq } from '../../config/connection.js';
import { Op } from 'sequelize';
import type from '../../helper/type.js';
import { comparePassword, hashPassword } from '../../helper/bcrypt.js'
import { generateToken } from '../../helper/jwt.js';
import { nanoid } from 'nanoid'
import moment from 'moment';





export class Controller{


    static async register(req,res){
        let {nama_komentator,isi_komentar,kehadiran}=req.body

        try {
             let data =await komentar.create({id:nanoid(14),nama_komentator,isi_komentar,kehadiran})
                  res.status(200).json({ status: 200, message: "success", data })
         
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "failure", data: error })
        }

       
    }

    static async update(req,res){
        let {nama_komentator,isi_komentar,kehadiran}=req.body

        try {

        let data = await komentar.update({nama_komentator,isi_komentar,kehadiran},{where:{id}})
          
        res.status(200).json({ status: 200, message: "success"})
                
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

            let data = await sq.query(`select * from komentar u where u ."deletedAt" isnull${isi} order by u."createdAt" desc${isi2}`,
            type({ offset: (+halaman * jumlah), jumlah, id}))
            if (halaman && jumlah) {
                let jml = await sq.query(`select count(*) as "total"  from komentar u where u ."deletedAt" isnull${isi} `,
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

    static async delete(req,res){
        let {id}=req.body

        try {

        let data = await komentar.destroy({where:{id}})
          
        res.status(200).json({ status: 200, message: "success"})
                
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "failure", data: error })
        }

       
    }

}