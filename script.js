new Vue({
  el: "#app",
  data() {
    return {
      // Define categories and set if it is public or no to apply
      categories: [
        { id: 'all', name: 'All' },
        { id: 1, name: 'MeetUp' },
        { id: 2, name: 'Leap' },
        { id: 3, name: 'Recruiting Mission' },
        { id: 4, name: 'VanHackathon' },
        { id: 5, name: 'Premium-only Webinar' },
        { id: 6, name: 'Open Webinar' },
      ],
      // Filter by category, default: all
      filterByCategory: "all",
      events: [],
      loading: true,
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      // Set the state to loading
      this.loading = true;
      axios.get('https://my-json-server.typicode.com/roble/vanhack/events')
        .then(response => {
          console.log(response);
          // Get the fetched  data
          this.events = response.data;
        }).catch(err => {
          // Give some feedback of the error
        })
        .finally(() => {
          // Unset loading state
          this.loading = false;
        })
    }
  },
  computed: {
    getEventsFiltered() {
      return this.filterByCategory === 'all'
        ? this.events
        : this.events.filter(e => e.eventType === this.filterByCategory)
    }
  }
});