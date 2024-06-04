#!/user/bin/env node

import {Command} from "commander";
import inquirer from "inquirer";
import fs from 'fs'
const program =new Command();
const ques=  [{
        type:'input',
        message:"What is your Title ?!!",
        name:"title"
        },
         {
        type:'number',
        message:"What is your price ?!!",
        name:"price"
     }
    ]

    program
    .name("codeZone Courses Manager")
    .description("CLI TOOL to help Students")
    .version("0.0.0")

    program
    .command("add")
    .description("Add course to Cli tools")
    .alias("a")
    .version("0.0.0")
    .action(()=>{
        inquirer 
            .prompt(ques)
            .then((answers)=>{
                if (fs.existsSync('./courses.json')) {
                        fs.readFile('./courses.json','utf-8',(err,data)=>{
                            if (err) {
                                console.log("ERROR",err);
                                process.exit();
                            }   
                        const fileContentAsJson=JSON.parse(data);          
                        fileContentAsJson.push(answers);            
                        fs.writeFile('./courses.json',JSON.stringify(fileContentAsJson),"utf-8",(err)=>{
                            console.log("add courses done");

                        })
                        })
                }else
                    {
                            fs.writeFile('./courses.json',JSON.stringify([answers]),"utf-8",(err)=>{
                            console.log("add courses done");

                        })
                    }
            })
            })
program
    .command("ls")
    .alias("li")
    .action(()=>{
       fs.readFile('./courses.json','utf8',(err,content)=>{
        if (err) {
            console.log(err);
            process.exit()
        }
        console.table(JSON.parse(content))
       })
    })
program.parse(process.argv)