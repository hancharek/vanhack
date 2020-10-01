new Vue({
  el: "#app",
  data() {
    return {
      // Define types and set if it is public or no to apply
      types: [
        { id: 'all', name: 'All' },
        { id: 1, name: 'MeetUp', color: 'gray', icon: 'fa-comments' },
        { id: 2, name: 'Leap', color: 'blue', icon: 'fa-share' },
        { id: 3, name: 'Recruiting Mission', color: 'red', icon: 'fa-search-plus' },
        { id: 4, name: 'VanHackathon', color: 'purple', icon: 'fa-fire' },
        { id: 5, name: 'Premium-only Webinar', color: 'orange', icon: 'fa-star' },
        { id: 6, name: 'Open Webinar', color: 'teal', icon: 'fa-check-square' },
      ],
      // Filter by type, default: all
      filterByType: "all",
      events: [],
      loading: true,
      showModalDetails: false,
      showModalError: false,
      showModalShare: false,
      showModalApplied: false,
      showingEvent: {},
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
    },
    apply() {
      // Check and apply to event
      if (!this.showingEvent.can_apply) this.showModalError = true
      else {
        this.showingEvent.applied = true;
        this.showModalDetails = false;
        this.$nextTick(() => {
          this.showModalApplied = true;
        })

      }
    },
    cancelApply() {
      // Cancel the application
      this.showingEvent.applied = false;
      this.showModalDetails = false;
    }
  },
  computed: {
    getEventsFiltered() {
      return this.filterByType === 'all'
        ? this.events
        : this.events.filter(e => e.type_id === this.filterByType)
    },
    isModalOpen() {
      return this.showModalError
        || this.showModalDetails
        || this.showModalShare
        || this.showModalApplied
    }
  }
});