import { excerpt, truncateText } from "./excerpt";
import { dateFormat } from "./dateFormat";
import { getPrimaryTitle, getSecondaryTitle } from "./parse-title";
import {
  getSpecialLabel,
  getDisplayLabel,
  getCategory,
  getCategories,
  getTag,
  getTags,
  hasCategories,
  hasTags,
  getDisplayLabel_,
  formatLabel,
  getLabel,
  labelSlugify,
  getRelatedTag,
  getFeaturedTag,
  getSeriesLabel,
  getSeriesTopicLabel,
  getSeriesOrder,
} from "./get-label";
import { slugify } from "./slugify";
import { hasPost, hasPostObj } from "./has-posts";
import { _isObject } from "./check";
import { isObject } from "./check";
import { getTodayVerseReference } from "./set-random-verse";
import { loadBiblePref, saveBiblePref } from "./bible-config";

export {
  excerpt,
  truncateText,
  dateFormat,
  getPrimaryTitle,
  getSecondaryTitle,
  getSpecialLabel,
  getDisplayLabel,
  slugify,
  hasPost,
  isObject,
  _isObject,
  hasPostObj,
  getTodayVerseReference,
  getCategory,
  getCategories,
  getTag,
  getTags,
  hasCategories,
  hasTags,
  getDisplayLabel_,
  formatLabel,
  getLabel,
  labelSlugify,
  getRelatedTag,
  getFeaturedTag,
  loadBiblePref,
  saveBiblePref,
  getSeriesLabel,
  getSeriesTopicLabel,
  getSeriesOrder,
};
