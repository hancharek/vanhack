new Vue({
  el: "#app",
  data() {
    return {
      // Define categories and set if it is public or no to apply
      categories: [
        { id: 'all', name: 'All' },
        { id: 1, name: 'MeetUp', public: true },
        { id: 2, name: 'Leap', public: true },
        { id: 3, name: 'Recruiting Mission', public: true },
        { id: 4, name: 'VanHackathon', public: true },
        { id: 5, name: 'Premium-only Webinar', public: false },
        { id: 6, name: 'Open Webinar', public: true },
      ],
      // Filter by category, default: all
      filterByCategory: "all",
      events: [],
      loading: true,
    };
  },
  methods: {

  },
});