export default function pagResultado(goTo: (url: string) => void): void {
    let app: HTMLElement = document.getElementById('app')!;
    app.innerHTML = `<h1>resultado</h1>`
}