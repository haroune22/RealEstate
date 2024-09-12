
export const addMessage = (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"});
    }
}