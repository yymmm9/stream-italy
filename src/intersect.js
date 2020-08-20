// if (
//         /Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) ===
//         true
//       ) {
//         const sections = [].slice.call(
//           document.querySelectorAll(".container")
//         );

//         function createObserver(el) {
//           let observer;

//           const options = {
//             root: null,
//             rootMargin: "0px",
//             threshold: 0.9
//           };

//           observer = new IntersectionObserver(handleIntersect, options);
//           observer.observe(el);
//         }

//         function handleIntersect(entries, observer) {
//           entries.forEach(entry => {
//             let visible = entry.intersectionRatio;
//             if (visible > 0.9) {
//               entry.target.classList.add("animation__active");
//             } else {
//             }
//           });
//         }

//         const setup = sections => {
//           for (let i in sections) {
//             const el = sections[i];
//             createObserver(el);
//           }
//         };

//         setup(sections);
//       } else {
//       }