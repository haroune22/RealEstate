import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getchats = async (req, res) => {

  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where:{
        userIDs:{
          hasSome:[tokenUserId]
        }
      }
    });
    
    res.status(200).json(chats);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats" });
  }
};

export const getchat = async (req, res) => {
  const id = req.params.id;

  try {
    const chat = await prisma.chat.findUnique({
      where:{
        id
      },
    });


    // Respond if there's no token
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats" });
  }
};

export const addchat = async (req, res) => {
 
  try {
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chats" });
  }
};

export const updatechat = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats" });
  }
};

export const readChat = async (req, res) => {


  try {
   
 

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chats" });
  }
};
