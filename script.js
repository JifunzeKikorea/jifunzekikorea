const menu = document.getElementById('menu');
const links = document.getElementById('links');

menu.addEventListener('click', () => links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', () => links.classList.remove('open'));
});

document.querySelectorAll('.answer').forEach(button => {
  button.addEventListener('click', () => {
    const result = document.getElementById('result');
    if (button.classList.contains('correct')) {
      result.textContent = '✅ Correct! 어머니 means Mother — Mama.';
      result.style.color = '#16803c';
    } else {
      result.textContent = '❌ Try again!';
      result.style.color = '#d32f2f';
    }
  });
});

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}
