import { Router, Request, Response } from 'express';

const router = Router();

let enableXSS = true;
let enableInsecureStorage = true;

function toggleXSS(enable: boolean) {
    enableXSS = enable;
}
  
function toggleInsecureStorage(enable: boolean) {
    enableInsecureStorage = enable;
}
  
router.post('/xss', (req: Request, res: Response) => {
    const userInput = req.body.input;
    if(enableXSS) {
        res.send(`<p>Rezultat pretrage: Osoba ${userInput} postoji</p>`);
    } else {
        const sanitizedInput = userInput.replace(/<script.*?>.*?<\/script>/gi, '');
        if(sanitizedInput === userInput) {
          res.send(`<p>Rezultat pretrage: Osoba ${sanitizedInput} postoji</p>`);
        } else {
          res.send(`<p>Pokušaj XSS napada, filtrirano<br>${sanitizedInput}</p>`);
        } 
        
    }
});

router.get('/sensitive-data', (req: Request, res: Response) => {
    if (enableInsecureStorage) {
      const sensitiveData = { token: "12345", user: "admin", password: "sifra123123", sessionID: "sessionID12345612345" };
      res.json(sensitiveData);
    } else {
      res.json({ user: "admin" });
    }
});

router.get('/toggle-xss', (req, res) => {
  toggleXSS(req.query.enable === 'true');
  res.send({ message: "XSS postavka ažurirana." });
});

router.get('/toggle-insecure-storage', (req, res) => {
  toggleInsecureStorage(req.query.enable === 'true');
  res.send({ message: "Pohrana podataka ažurirana." });
});

export default router;