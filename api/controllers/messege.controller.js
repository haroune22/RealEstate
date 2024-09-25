
export const addMessage = (req, res) => {
    try {
        console.log("message added")
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"});
    }
}