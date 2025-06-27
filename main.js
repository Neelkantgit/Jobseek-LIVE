document.addEventListener("DOMContentLoaded", () => {
  const jobContainer = document.querySelector(".job-listing");

  function displayJobs(jobList) {
    jobContainer.innerHTML = "";
    jobList.forEach(job => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <img src="${job.logo}" alt="${job.company}" class="company-logo" />
        <h4>${job.title}</h4>
        <p class="company-location">${job.company} · ${job.location}</p>
        <div class="tags">
          <span class="tag">${job.type}</span>
          ${job.remote ? '<span class="tag">Remote</span>' : ""}
        </div>
        <p class="salary">Rs-Negotiable · Posted ${job.posted}</p>
        <button>Apply Now</button>
      `;
      jobContainer.appendChild(jobCard);
    });
  }

  fetch("jobs.json")
    .then(res => res.json())
    .then(data => {
      displayJobs(data);

      // Search form
      document.querySelector(".search-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = e.target[0].value.toLowerCase();
        const location = e.target[1].value.toLowerCase();

        const filtered = data.filter(job =>
          job.title.toLowerCase().includes(title) &&
          job.location.toLowerCase().includes(location)
        );

        displayJobs(filtered);
      });
    })
    .catch(err => {
      jobContainer.innerHTML = "<p>Error loading job listings.</p>";
      console.error(err);
    });
});
