{{ 'section-collection-list.css' | asset_url | stylesheet_tag }}
{{ 'component-card.css' | asset_url | stylesheet_tag }}
{{ 'component-slider.css' | asset_url | stylesheet_tag }}
{{ 'collection-list.css' | asset_url | stylesheet_tag }}
{{ 'my-video.css' | asset_url | stylesheet_tag }}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

{%- liquid
  assign columns_mobile_int = section.settings.columns_mobile | plus: 0
  assign show_mobile_slider = false
  if section.settings.swipe_on_mobile and section.blocks.size > columns_mobile_int
    assign show_mobile_slider = true
  endif
-%}

<div class="color-{{ section.settings.color_scheme }} gradient">
  <div class="collection-list-wrapper  isolate{% if show_mobile_slider %} page-width-desktop{% endif %}{% if section.settings.title == blank %} no-heading{% endif %}{% if section.settings.show_view_all == false or section.blocks.size > collections.size %} no-mobile-link{% endif %} section-{{ section.id }}-padding">
    {%- unless section.settings.title == blank -%}
      <div class="title-wrapper-with-link{% if show_mobile_slider %} title-wrapper--self-padded-tablet-down{% else %} title-wrapper--self-padded-mobile{% endif %} title-wrapper--no-top-margin">
        <h3
          id="SectionHeading-{{ section.id }}"
          class="collection-list-title inline-richtext {% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}"
        >
          {{ section.settings.title }}
        </h3>

        {%- if section.settings.show_view_all and show_mobile_slider -%}
          <a
            href="{{ routes.collections_url }}"
            id="ViewAll-{{ section.id }}"
            class="link underlined-link large-up-hide{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}"
            aria-labelledby="ViewAll-{{ section.id }} SectionHeading-{{ section.id }}"
          >
            {{- 'sections.collection_list.view_all' | t -}}
          </a>
        {%- endif -%}
      </div>
    {%- endunless -%}

    <slider-component class="slider-mobile-gutter{% if settings.animations_reveal_on_scroll %} my-page_width  scroll-trigger animate--slide-in{% endif %}">
      <ul
        class="my-video vide-collection-list contains-card contains-card--collection{% if settings.card_style == 'standard' %} contains-card--standard{% endif %} grid grid--{{ section.settings.columns_desktop }}-col-desktop grid--{{ section.settings.columns_mobile }}-col-tablet-down{% if section.settings.swipe_on_mobile %} slider slider--tablet grid--peek{% endif %} collection-list--{{ section.blocks.size }}-items"
        id="Slider-{{ section.id }}"
        role="list"
      >
        {%- liquid
          assign columns = section.blocks.size
          if columns > 3
            assign columns = 3
          endif
        -%}
        {%- for block in section.blocks -%}
          <li
            id="Slide-{{ section.id }}-{{ forloop.index }}"
            class=" video-collection-list__item grid__item{% if show_mobile_slider %} slider__slide{% endif %}{% if block.settings.collection.featured_image == nil %} collection-list__item--no-media{% endif %}{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}"
            {{ block.shopify_attributes }}
            {% if settings.animations_reveal_on_scroll %}
              data-cascade
              style="--animation-order: {{ forloop.index }};"
            {% endif %}
          >
                <div class="my_video_body">
                    {{ block.settings.video_id  |  video_tag : autoplay: true, loop: true, controls: false,  muted: true}}

                    <div class="video_content color-{{ section.settings.content_color_scheme }}" >
    
                        {%- assign image_size_2x = block.settings.image_width | times: 2 | at_most: 5760 -%}

                        <div class="vider_img" style="max-width: min(100%, {{ section.settings.image_width }}px);">
                            <img  src=" {{ block.settings.video_hedding_img |  image_url:width:block.settings.video_hedding_img.width }}"  >
                        </div>
                    </div>
                </div>
          </li>
        {%- endfor -%}
      </ul>
      {%- if show_mobile_slider -%}
        <div class="slider-buttons">
          <button
            type="button"
            class="slider-button slider-button--prev"
            name="previous"
            aria-label="{{ 'general.slider.previous_slide' | t }}"
          >
            {% render 'icon-caret' %}
          </button>
          <div class="slider-counter caption">
            <span class="slider-counter--current">1</span>
            <span aria-hidden="true"> / </span>
            <span class="visually-hidden">{{ 'general.slider.of' | t }}</span>
            <span class="slider-counter--total">{{ section.blocks.size }}</span>
          </div>
          <button
            type="button"
            class="slider-button slider-button--next"
            name="next"
            aria-label="{{ 'general.slider.next_slide' | t }}"
          >
            {% render 'icon-caret' %}
          </button>
        </div>
      {%- endif -%}
    </slider-component>

    {%- if section.settings.show_view_all and section.blocks.size < collections.size -%}
      <div
        class="center collection-list-view-all{% if show_mobile_slider %} small-hide medium-hide{% endif %}{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}"
        {% if settings.animations_reveal_on_scroll %}
          data-cascade
        {% endif %}
      >
        <a
          href="{{ routes.collections_url }}"
          class="button"
          id="ViewAllButton-{{ section.id }}"
          aria-labelledby="ViewAllButton-{{ section.id }} SectionHeading-{{ section.id }}"
        >
          {{- 'sections.collection_list.view_all' | t -}}
        </a>
      </div>
    {%- endif -%}
  </div>
</div>


{% schema %}
{
  "name": "Multicolumn video",
  "tag": "section",
  "class": "section section-collection-list",
  "max_blocks": 15,
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "inline_richtext",
      "id": "title",
      "default": "Collections",
      "label": "t:sections.collection-list.settings.title.label"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        {
          "value": "h2",
          "label": "t:sections.all.heading_size.options__1.label"
        },
        {
          "value": "h1",
          "label": "t:sections.all.heading_size.options__2.label"
        },
        {
          "value": "h0",
          "label": "t:sections.all.heading_size.options__3.label"
        }
      ],
      "default": "h1",
      "label": "t:sections.all.heading_size.label"
    },
    {
    "type": "range",
    "id": "image_width",
          "min": 50,
          "max": 550,
          "step": 5,
          "unit": "px",
          "label": "Image width",
          "default": 100
        },
    {
      "type": "select",
      "id": "image_ratio",
      "options": [
        {
          "value": "adapt",
          "label": "t:sections.collection-list.settings.image_ratio.options__1.label"
        },
        {
          "value": "portrait",
          "label": "t:sections.collection-list.settings.image_ratio.options__2.label"
        },
        {
          "value": "square",
          "label": "t:sections.collection-list.settings.image_ratio.options__3.label"
        }
      ],
      "default": "square",
      "label": "t:sections.collection-list.settings.image_ratio.label",
      "info": "t:sections.collection-list.settings.image_ratio.info"
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "min": 1,
      "max": 6,
      "step": 1,
      "default": 3,
      "label": "t:sections.collection-list.settings.columns_desktop.label"
    },
    {
      "type": "color_scheme",
      "id": "color_scheme",
      "label": "t:sections.all.colors.label",
      "info": "t:sections.all.colors.has_cards_info",
      "default": "scheme-1"
    },
    {
      "type": "color_scheme",
      "id": "content_color_scheme",
      "label": "t:sections.all.colors.label",
      "info": "t:sections.all.colors.has_cards_info",
      "default": "scheme-1"
    },
    {
      "type": "checkbox",
      "id": "show_view_all",
      "default": false,
      "label": "t:sections.collection-list.settings.show_view_all.label"
    },
    {
      "type": "header",
      "content": "t:sections.collection-list.settings.header_mobile.content"
    },
    {
      "type": "select",
      "id": "columns_mobile",
      "options": [
        {
          "value": "1",
          "label": "t:sections.collection-list.settings.columns_mobile.options__1.label"
        },
        {
          "value": "2",
          "label": "t:sections.collection-list.settings.columns_mobile.options__2.label"
        }
      ],
      "default": "1",
      "label": "t:sections.collection-list.settings.columns_mobile.label"
    },
    {
      "type": "checkbox",
      "id": "swipe_on_mobile",
      "default": false,
      "label": "t:sections.collection-list.settings.swipe_on_mobile.label"
    },
    {
      "type": "header",
      "content": "t:sections.all.padding.section_padding_heading"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_bottom",
      "default": 36
    }
  ],
  "blocks": [
    {
      "type": "featured_collection",
      "name": "t:sections.collection-list.blocks.featured_collection.name",
      "settings": [
        {
          "type": "video",
          "id": "video_id",
          "label": "Add image"
        },
        {
          "type": "image_picker",
          "id": "video_hedding_img",
          "label": "Add image"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Multicolumn video",
      "blocks": [
        {
          "type": "featured_collection"
        },
        {
          "type": "featured_collection"
        },
        {
          "type": "featured_collection"
        }
      ]
    }
  ]
}
{% endschema %}


	
5:06 PM







.my-page_width{padding: 0 30px;}

.video-collection-list__item img{ width: 100% ;}
.video_content{padding: 5px 10px;}
.my_video_body{width: 100% }
.vide-collection-list video {
    width: 100%;
    height: 100%;
}
li.video-collection-list__item{height: 100%;}

.vide-collection-list .slick-track{
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    justify-content: center;
}
.slick-center{
    transform: scale(1.3);
}

