export default function pagInicio(): void {
    let app: HTMLElement = document.getElementById('app')!;
    app.innerHTML = ``;
    app.innerHTML = `
        <mi-buttom tipo = 'crear' class = 'buttomCrear' contenido = "Nuevo juego"></mi-buttom>
        <mi-buttom tipo = 'ingresar' class = 'buttomIngresar' contenido = "Ingresar a una sala"></mi-buttom>
        <mi-form hidden = '' class = 'formCrear' tipo = 'crear'></mi-form>
        <mi-form hidden = '' class = 'formIngresar' tipo = 'ingresar'></mi-form>`
}
//