/**
 * Created by venkatsrinag on 19/5/17.
 */
if (Meteor.isServer) {
  MlMenus.upsert({name: "mlSubChapterAdminNonMoolya"}, {
    $set: {
      "name": "mlSubChapterAdminNonMoolya",
      "menu": [
        {
          "image": "/images/db_icon.png",
          "link": "/admin/dashboard/chapters",
          "name": "Dashboard",
          "uniqueId": "dashboard",
          "isLink": true,
          "isMenu": true,
          "subMenu": [
            {
              "link": "",
              "name": "Clusters",
              "uniqueId": "dashboard_clusters",
              "subMenuMappingId": "dashboard_clusters",
              "subMenusId": "dashboard",
              "isLink": false,
              "isMenu": false,
              "isDisabled": true,
              "image": ""
            },
            {
              "link": "/admin/dashboard/chapters",
              "name": "Chapters",
              "dynamicLink": true,
              "dynamicLinkHandler": "",
              "uniqueId": "dashboard_chapters",
              "subMenuMappingId": "dashboard_chapters",
              "subMenusId": "dashboard",
              "isLink": true,
              "image": "",
              "subMenu": [
                {
                  "link": "/admin/dashboard/clusters",
                  "name": "SpecChapters",
                  "uniqueId": "dashboard_specChapters",
                  "subMenuMappingId": "dashboard_chapters",
                  "subMenusId": "dashboard",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""

                },
                {
                  "link": "/admin/dashboard/clusters",
                  "name": "SpecSubChapters",
                  "uniqueId": "dashboard_specSubChapters",
                  "subMenuMappingId": "dashboard_chapters",
                  "subMenusId": "dashboard",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""

                }]
            },
            {
              "link": "/admin/dashboard/communities",
              "name": "Communities",
              "uniqueId": "dashboard_communities",
              "subMenuMappingId": "dashboard_communities",
              "subMenusId": "dashboard",
              "isLink": true,
              "image": ""
            },
          ]
        },
        {
          "image": "/images/cluster_icon.png",
          "link": "",
          "name": "Cluster",
          "uniqueId": "cluster",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/chapter_icon.png",
          "link": "/admin/chapters",
          "uniqueId": "chapter",
          "name": "chapter",
          "isLink": true,
          "isMenu": true,
          "hideSubMenu": true,
          "subMenu": [
            {
              "link": "/admin/chapters",
              "name": "Chapters",
              "uniqueId": "chapter_chapters",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "dynamicLink": true,
              "hideSubMenu": true,
              "dynamicLinkHandler": "",
              "subMenusId": "chapter",
              "subMenuMappingId": "chapter_chapters",
              "subMenu": [
                {
                  "link": "/admin/chapters/subChapters/subChapterDetails",
                  "name": "SubChapterDetails",
                  "uniqueId": "chapter_subChapterDetails",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "chapter_chapters",
                  "subMenuMappingId": "chapter_subChapterDetails"
                },
                {
                  "link": "/admin/chapters/subChapters/communities",
                  "name": "Communities",
                  "uniqueId": "chapter_communities",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "chapter_chapters",
                  "subMenuMappingId": "chapter_communities",
                  "subMenu": [
                    {
                      "link": "/admin/chapters/subChapters/communities/communityDetails",
                      "name": "Community Details",
                      "uniqueId": "chapter_communities_communityDetails",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "chapter_communities",
                      "subMenuMappingId": "chapter_communities_communityDetails"
                    },
                    {
                      "link": "/admin/chapters/subChapters/communities/assignusers",
                      "name": "Backend Users",
                      "uniqueId": "chapter_communities_assignusers",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "chapter_communities",
                      "subMenuMappingId": "chapter_communities_assignusers"
                    },
                  ]
                },
                {
                  "link": "/admin/chapters/assignusers",
                  "name": "Backend Users",
                  "uniqueId": "chapter_assignusers",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "chapter_chapters",
                  "subMenuMappingId": "chapter_assignusers"
                }
              ]
            }
          ]
        },
        {
          "image": "/images/community_icon.png",
          "link": "/admin/communities",
          "uniqueId": "community",
          "name": "community",
          "isLink": true,
          "isMenu": true,
          "hideSubMenu": true,
          "subMenu": [
            {
              "link": "/admin/community/chapter",
              "name": "Chapter",
              "uniqueId": "communities_chapters",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "dynamicLink": true,
              "dynamicLinkHandler": "",
              "subMenusId": "community",
              "hideSubMenu": true,
              "subMenuMappingId": "communities_chapters",
              "subMenu": [
                {
                  "link": "/admin/community/chapter/subChapter",
                  "name": "Sub Chapter",
                  "uniqueId": "communities_subChapters",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "communities_chapters",
                  "hideSubMenu": true,
                  "subMenuMappingId": "communities_subChapters",
                  "subMenu": [
                    {
                      "link": "/admin/community/subChapter/community/communityDetails",
                      "name": "Community Details",
                      "uniqueId": "communities_subChapters_communityDetails",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "communities_subChapters",
                      "subMenuMappingId": "communities_subChapters_communityDetails",
                    },
                    {
                      "link": "/admin/community/subChapter/community/assignuser",
                      "name": "Backend User",
                      "uniqueId": "communities_subChapters_assignUsers",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "communities_subChapters",
                      "subMenuMappingId": "communities_subChapters_assignUsers",
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Users",
          "uniqueId": "users",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Transcations",
          "uniqueId": "transcations",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Notifications",
          "uniqueId": "notifications",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Conversations",
          "uniqueId": "conversations",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Settings",
          "uniqueId": "settings",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Offerings",
          "uniqueId": "offerings",
          "isLink": true,
          "isMenu": true,
        },
      ]
    }
  });
}
