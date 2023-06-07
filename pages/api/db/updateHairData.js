export async function updateHairData(){
    let params = new URLSearchParams(location.search);
    const id=params.get('id')
    const type=params.get('type')
    const updateHair = await prisma.uzytkownicy.update({
      where: {
        id_konta: id,
      },
      data: {
        typ_wlosa_id: type,
      },
    })
  }
  