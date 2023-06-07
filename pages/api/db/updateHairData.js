export async function updateHairData(req, res){
    //let params = new URLSearchParams(location.search);
    //const id=params.get('id')
    //const type=params.get('type')
    const { method } = req
    const { id_k, result } = req.body;
    const updateHair = await prisma.uzytkownicy.update({
      where: {
        id_konta: id_k,
      },
      data: {
        typ_wlosa_id: result,
      },
    })
    res.status(201).json(updateHair)
  }
  