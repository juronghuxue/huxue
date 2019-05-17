enum Response1{
    No,
    Yes
}
function respond(recipient: string, message: Response1): void {
    console.log(recipient+' '+message);
}

respond("huxu", Response1.Yes)