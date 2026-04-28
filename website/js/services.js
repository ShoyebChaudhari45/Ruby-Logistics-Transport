/* Service Detail Modal — populated dynamically when "Learn More" is clicked */
(function () {
  'use strict';

  const SERVICE_DETAILS = {
    'Freight Forwarding & Transportation': {
      icon: 'fa-shipping-fast',
      tagline: 'End-to-end freight management with our robust fleet',
      bullets: [
        'Bulk consignments and high-volume distribution',
        'Time-sensitive cargo with on-schedule delivery',
        'Multi-axle trucks, trailers and container carriers',
        'Pan India coverage from Aurangabad HQ',
        'GPS-enabled fleet with fuel sensors and live tracking'
      ],
      footer: 'Ideal for cement, beverage, FMCG and industrial cargo movers.'
    },
    'Clearing & Forwarding (C&F)': {
      icon: 'fa-file-contract',
      tagline: 'Smooth cargo movement with full regulatory compliance',
      bullets: [
        'Full C&F agency operations for OEMs and brands',
        'Documentation, octroi, e-way bill, and statutory filings',
        'Warehousing and dispatch coordination',
        'Stock management and reconciliation',
        'Last-mile distribution to dealers and retailers'
      ],
      footer: 'Used by leading cement and beverage majors across the region.'
    },
    'Cement Distribution': {
      icon: 'fa-industry',
      tagline: '50,000 MT per month — 25+ years of cement logistics expertise',
      bullets: [
        'Dedicated fleet for cement bag and bulk movements',
        'Adani, Orient, Wonder &amp; Chettinad Cement partnerships',
        'Plant-to-warehouse and warehouse-to-dealer flows',
        'Trained drivers, tarpaulin-covered loads, theft protection',
        'Real-time tracking and proof-of-delivery'
      ],
      footer: 'Our flagship service line — backed by 4 decades of relationships.'
    },
    'Beer Industry Logistics': {
      icon: 'fa-beer',
      tagline: '10 Lac cases per month for India\'s top breweries',
      bullets: [
        'Temperature- and damage-safe handling for glass bottles',
        'ABInBev, United Breweries &amp; Carlsberg partnerships',
        'Excise documentation and depot-to-depot movement',
        'Reverse logistics for empty bottles &amp; crates',
        'Specialized covered carriers and trained crews'
      ],
      footer: 'Contracts spanning 15-20 years with no service breaks.'
    },
    'Supply Chain Management': {
      icon: 'fa-network-wired',
      tagline: 'Integrated supply chain from origin to dealer shelf',
      bullets: [
        'Route optimization and load planning',
        'Live tracking dashboards for clients',
        'Inventory and stock-level coordination',
        'Multi-modal handoffs (road + rail integration)',
        'Performance reporting and SLA monitoring'
      ],
      footer: 'Proven across cement, beer and cold-drink categories.'
    },
    'Real Estate Development': {
      icon: 'fa-city',
      tagline: 'Strategic real estate &amp; land development across Marathwada',
      bullets: [
        'Operated through Ruby Builders &amp; Developers',
        'Residential and commercial project execution',
        'Land aggregation and approvals',
        'Quality-first construction practices',
        'Long-standing local market expertise'
      ],
      footer: 'A complementary business line to our logistics operations.'
    }
  };

  const decode = (s) => {
    const t = document.createElement('textarea');
    t.innerHTML = s;
    return t.value;
  };

  const modal = document.getElementById('serviceModal');
  const closeBtn = document.getElementById('closeServiceModal');
  const titleEl = document.getElementById('serviceModalTitle');
  const subEl = document.getElementById('serviceModalSub');
  const bodyEl = document.getElementById('serviceModalBody');
  const quoteBtn = document.getElementById('serviceModalQuote');
  const quoteModal = document.getElementById('quoteModal');

  function openServiceModal(serviceKey) {
    if (!modal) return;
    const data = SERVICE_DETAILS[serviceKey];
    if (!data) return;
    titleEl.textContent = serviceKey;
    subEl.innerHTML = data.tagline;
    bodyEl.innerHTML = `
      <div class="sm-icon"><i class="fas ${data.icon}"></i></div>
      <ul class="sm-bullets">
        ${data.bullets.map(b => `<li><i class="fas fa-check-circle"></i><span>${b}</span></li>`).join('')}
      </ul>
      <p class="sm-footer">${data.footer}</p>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.service-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = decode(btn.dataset.service || '');
      openServiceModal(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeServiceModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeServiceModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeServiceModal();
  });

  if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
      closeServiceModal();
      if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
})();
