new Vue({
  el: "#app",
  data() {
    return {
      // Define types and set if it is public or no to apply
      types: [
        { id: 'all', name: 'All' },
        { id: 1, name: 'MeetUp' },
        { id: 2, name: 'Leap' },
        { id: 3, name: 'Recruiting Mission' },
        { id: 4, name: 'VanHackathon' },
        { id: 5, name: 'Premium-only Webinar' },
        { id: 6, name: 'Open Webinar' },
      ],
      // Filter by type, default: all
      filterByType: "all",
      events: [],
      loading: true,
      showModalError: true
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
          this.events = response.data
            .map(e => ({
              ...e,
              type: this.types.find(f => f.id === e.type_id),
              start_date: new Date(e.start_date).toLocaleDateString(),
              end_date: new Date(e.end_date).toLocaleDateString()
            }));
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
      return this.filterByType === 'all'
        ? this.events
        : this.events.filter(e => e.type_id === this.filterByType)
    }
  }
});