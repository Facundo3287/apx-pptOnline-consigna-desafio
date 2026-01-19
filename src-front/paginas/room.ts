export default function pagRoom(goTo: (url: string) => void): void {
    let app: HTMLElement = document.getElementById('app')!;
    app.innerHTML = `<h1>room</h1>`
}